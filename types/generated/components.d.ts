import type { Struct, Schema } from '@strapi/strapi';

export interface StudioComponentsStudioComponents
  extends Struct.ComponentSchema {
  collectionName: 'components_studio_components_studio_components';
  info: {
    displayName: 'StudioComponents';
  };
  attributes: {
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
  };
}

export interface StudioComponentsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_studio_components_features';
  info: {
    displayName: 'Features';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'studio-components.studio-components': StudioComponentsStudioComponents;
      'studio-components.features': StudioComponentsFeatures;
    }
  }
}
