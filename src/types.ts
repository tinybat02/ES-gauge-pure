import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  threshold: number;
  showText: boolean;
}

export const defaults: PanelOptions = {
  threshold: 600,
  showText: false,
};

export interface Buffer extends Vector {
  buffer: number[];
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}
