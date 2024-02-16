import json
from typing import Any, cast

from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntry
from homeassistant.core import HomeAssistant
# noinspection PyProtectedMember
from homeassistant.helpers.template import TemplateEnvironment, _NO_HASS_ENV
from homeassistant.helpers.typing import ConfigType

DOMAIN = 'custom_jinja2_filters'

def to_pretty_json(string, indent=2):
    return json.dumps(string, indent=indent)

def customize_env(hass: HomeAssistant, env: TemplateEnvironment):
    env.filters['to_pretty_json'] = to_pretty_json
    
async def async_setup(hass: HomeAssistant, yaml_config: ConfigType):
    customize_env(hass, _NO_HASS_ENV)

    if DOMAIN in yaml_config and not hass.config_entries.async_entries(DOMAIN):
        hass.async_create_task(hass.config_entries.flow.async_init(
            DOMAIN, context={'source': SOURCE_IMPORT}
        ))

    return True

async def async_setup_entry(hass: HomeAssistant, _: ConfigEntry):
    for env in hass.data.values():
        if isinstance(env, TemplateEnvironment):
            customize_env(hass, env)

    CustomTemplateEnvironment.base_init = cast(Any, TemplateEnvironment.__init__)
    TemplateEnvironment.__init__ = CustomTemplateEnvironment.init

    return True


async def async_unload_entry(*_):
    TemplateEnvironment.__init__ = CustomTemplateEnvironment.base_init
    return True


class CustomTemplateEnvironment:
    base_init = None

    @staticmethod
    def init(*args, **kwargs):
        CustomTemplateEnvironment.base_init(*args, **kwargs)
        customize_env(args[0].hass, args[0])
