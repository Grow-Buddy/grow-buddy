import PlantRepository from "../repositories/PlantRepository";
import Clipboard from "expo-clipboard";
import {Plant} from "../model/Plant";
import ObjectUtils from "../common/ObjectUtils";

class ImportExportService {

    async exportAllPlantsIntoClipboard() {
        const plants = await PlantRepository.selectAllPlants();
        const plantsAsString = JSON.stringify(plants);

        Clipboard.setString(plantsAsString);
    }

    async importAllPlantsFromClipboard() {
        const plantsAsString = await Clipboard.getStringAsync();
        if (ObjectUtils.isDefined(plantsAsString)) {
            const plants = JSON.parse(plantsAsString) as Plant[];

            for (const plant of plants) {
                plant.id = undefined;
                await PlantRepository.insertOrUpdatePlant(plant);
            }
        }
    }

}

export default new ImportExportService();