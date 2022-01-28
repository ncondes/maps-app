// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface PlacesResponse {
    type:        string;
    query:       number[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_en:       string;
    place_name_en: string;
    text:          string;
    place_name:    string;
    bbox:          number[];
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:          string;
    short_code:  string;
    wikidata:    string;
    text_en:     string;
    language_en: string;
    text:        string;
    language:    string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
}