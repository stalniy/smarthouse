
from hashlib import md5
from homeassistant.components import websocket_api
from homeassistant.helpers import entity_registry as er
import voluptuous as vol
from homeassistant.core import HomeAssistant, callback
from ..const import DOMAIN, CONF_USERNAME, CONF_PASSWORD
from homeassistant.auth.permissions.const import POLICY_READ

@websocket_api.websocket_command({
    vol.Required("type"): "dahua/camera_authenticate",
    vol.Required("entity_id"): str,
    vol.Required("details"): {
        vol.Required("Uri"): vol.All(str, vol.Url()),
        vol.Required("Realm"): str,
        vol.Required("Nonce"): str,
        vol.Required("Method"): vol.Any("OPTIONS")
    }
})
@callback
def ws_camera_authenticate(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
):
    entity_id = msg["entity_id"]

    if not connection.user.permissions.check_entity(entity_id, POLICY_READ):
        connection.send_error(msg["id"], "permission_denied", "You do not have permission to access this entity")
        return

    # Get the entity registry entry to find the config entry
    entity_registry = er.async_get(hass)
    entity_entry = entity_registry.async_get(entity_id)

    if not entity_entry or not entity_entry.config_entry_id:
        connection.send_error(msg["id"], "entity_not_found", "Entity not found or not associated with a config entry")
        return

    # Get the config entry to access username and password
    config_entry = hass.config_entries.async_get_entry(entity_entry.config_entry_id)

    if not config_entry or config_entry.domain != DOMAIN:
        connection.send_error(msg["id"], "config_entry_not_found", "Config entry not found or not a Dahua integration")
        return

    username = config_entry.data.get(CONF_USERNAME)
    password = config_entry.data.get(CONF_PASSWORD)

    if not username or not password:
        connection.send_error(msg["id"], "credentials_not_found", "Username or password not found in config entry")
        return

    details = msg["details"]
    uri = details["Uri"]
    realm = details["Realm"]
    nonce = details["Nonce"]
    method = details["Method"]
    digest = digest_auth(username, password, uri, realm, nonce, method)
    connection.send_result(msg["id"], {"username": username, "digest": digest})


def digest_auth(user: str, password: str, uri: str, realm: str, nonce: str, method: str):
    part1 = md5(f"{user}:{realm}:{password}".encode()).hexdigest()
    part2 = md5(f"{method}:{uri}".encode()).hexdigest()

    return md5(f"{part1}:{nonce}:{part2}".encode()).hexdigest()
