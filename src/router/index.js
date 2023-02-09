import { createMemoryHistory, createRouter } from "vue-router";
import Start from "../components/Start.vue";
import RandomMode from "../components/modes/RandomMode.vue";
import ModeSelect from "../components/ModeSelect.vue";
import SetNickname from "../components/SetNickname.vue";
import Gear from "../components/Gear.vue";
import decadeSelection from "../components/modes/decadeSelection.vue"
import DecadeMode from "../components/modes/DecadeMode.vue"
import CompaniesMode from "../components/modes/CompaniesMode.vue"
import HardcoreMode from "../components/modes/HardcoreMode.vue"

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/random",
    name: "Random",
    component: RandomMode,
  },
  {
    path: "/modeselect",
    name: "ModeSelect",
    component: ModeSelect,
  },
  {
    path: "/companies",
    name: "Companies",
    component: CompaniesMode,
  },
  {
    path: "/hardcore",
    name: "Hardcore",
    component: HardcoreMode,
  },
  {
    path: "/decade/:id",
    name: "DecadeMode",
    component: DecadeMode,
  },
  {
    path: "/decadeSelection",
    name: "decadeSelection",
    component: decadeSelection,
  },
  {
    path: "/nickname",
    name: "SetNickname",
    component: SetNickname,
  },
  {
    path: "/gearsettings",
    name: "GearSettings",
    component: Gear,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;