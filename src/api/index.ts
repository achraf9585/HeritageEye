import aarif_castle from "../data/aarif-castle.json";
import aarif_castle_ar from "../data/aarif-castle-ar.json";
import abarhema from "../data/abarhema.json"
import abarhema_ar from "../data/abarhema-ar.json"
import adosareyah_castle from "../data/adosareyah-castle.json";
import adosareyah_castle_ar from "../data/adosareyah-castle-ar.json";
import al_faw from "../data/Al-Faw.json";
import al_faw_ar from "../data/Al-Faw-ar.json";
import al_okhdud from "../data/al-okhdud.json"
import al_okhdud_ar from "../data/al-okhdud-ar.json";
import albassam_heritage_house from "../data/albassam-heritage-house.json"
import albassam_heritage_house_ar from "../data/albassam-heritage-house-ar.json"
import house_of_allegiance from "../data/house-of-allegiance.json";
import house_of_allegiance_ar from "../data/house-of-allegiance-ar.json";
import jubbah_and_shuwaymis from "../data/jubbah-and-shuwaymis.json"
import jubbah_and_shuwaymis_ar from "../data/jubbah-and-shuwaymis-ar.json"
import sites from "../data/sites.json";
import sour_city from "../data/sour-city.json";
import sour_city_ar from "../data/sour-city-ar.json"
import the_ain from "../data/thee-ain.json";
import the_ain_ar from "../data/thee-ain-ar.json";
import ushaiqer_heritage_village from "../data/ushaiqer-heritage-village.json";
import ushaiqer_heritage_village_ar from "../data/ushaiqer-heritage-village-ar.json";
import wasat_dooma from "../data/wasat-dooma.json"
import wasat_dooma_ar from "../data/wasat-dooma-ar.json"
import zaabal_castle from "../data/zaabal-castle.json"
import zaabal_castle_ar from "../data/zaabal-castle-ar.json";
export const getSites = async () => {
  return sites;
};

export const getSiteData = async (id: string, language?: string) => {
  // TODO: Fetch site data from API
  switch (id) {
    case "house-of-allegiance":
      return language === "ar" ? house_of_allegiance_ar : house_of_allegiance
    case "ushaiqer-heritage-village":
      return language === "ar" ? ushaiqer_heritage_village_ar : ushaiqer_heritage_village
    case "albassam-heritage-house":
      return language === "ar" ? albassam_heritage_house_ar : albassam_heritage_house
    case "aarif-castle":
      return language === "ar" ? aarif_castle_ar : aarif_castle
    case "zaabal-castle":
      return language === "ar" ? zaabal_castle_ar : zaabal_castle
    case "sour-city":
      return language === "ar" ? sour_city_ar : sour_city
    case "thee-ain-ancient-village":
      return language === "ar" ? the_ain_ar : the_ain
    case "jubbah-and-shuwaymis":
      return language === "ar" ? jubbah_and_shuwaymis_ar : jubbah_and_shuwaymis
    case "dumat-al-jandal":
      return language === "ar" ? wasat_dooma_ar : wasat_dooma
    case "adosareyah-castle":
      return language === "ar" ? adosareyah_castle_ar : adosareyah_castle
    case "al-okhdud":
      return language === "ar" ? al_okhdud_ar : al_okhdud
    case "abarhema":
      return language === "ar" ? abarhema_ar : abarhema
      case "al-faw":
        return language === "ar" ? al_faw_ar : al_faw
    default:
      return house_of_allegiance
  }
};