import { NativeModules } from 'react-native';

type SamsungHealthAndroidType = {
  Types: Record<string, string>;
  createMetric(
    props: SamsungHealthAndroidMetricProps
  ): SamsungHealthAndroidMetric;
  connect(debug: boolean): Promise<boolean>;
  disconnect(): Promise<boolean>;
  askPermissionAsync(permissions: string[]): Promise<Record<string, boolean>>;
  getPermissionAsync(permissions: string[]): Promise<Record<string, boolean>>;
  readDataAsync(
    metric: SamsungHealthAndroidMetric
  ): Promise<Record<string, number>[]>;
};

type SamsungHealthAndroidMetric = {
  type: string;
  properties: string[];
  start: number;
  end: number;
};

type SamsungHealthAndroidMetricProps = {
  type: string;
  start: number;
  end: number;
};

const { SamsungHealthAndroid } = NativeModules;

SamsungHealthAndroid.Types = SamsungHealthAndroid.getConstants();
SamsungHealthAndroid.createMetric = (
  props: SamsungHealthAndroidMetricProps
): SamsungHealthAndroidMetric => {
  const { type } = props;
  let properties: string[] = [];

  switch (type) {
    case SamsungHealthAndroid.Types.StepCount:
      properties = ['calorie', 'count', 'distance', 'speed'];
      break;
    case SamsungHealthAndroid.Types.Sleep:
      properties = ['custom', 'comment'];
      break;
    case SamsungHealthAndroid.Types.SleepStage:
      properties = ['stage', 'sleep_id'];
      break;
    case SamsungHealthAndroid.Types.CaffeineIntake:
      properties = ['amount', 'unit_amount'];
      break;
    case SamsungHealthAndroid.Types.BodyTemperature:
      properties = ['temperature'];
      break;
    case SamsungHealthAndroid.Types.BloodPressure:
      properties = ['diastolic', 'mean', 'pulse', 'systolic'];
      break;
    case SamsungHealthAndroid.Types.Electrocardiogram:
      properties = [
        'data',
        'data_format',
        'max_heart_rate',
        'mean_heart_rate',
        'min_heart_rate',
        'sample_count',
        'sample_frequency',
      ];
      break;
    case SamsungHealthAndroid.Types.HeartRate:
      properties = [
        'min',
        'max',
        'heart_rate',
        'heart_bate_count',
        'binning_data',
      ];
      break;
    case SamsungHealthAndroid.Types.OxygenSaturation:
      properties = ['heart_rate', 'spo2'];
      break;
    case SamsungHealthAndroid.Types.AmbientTemperature:
      properties = [
        'accuracy',
        'altitude',
        'humidity',
        'latitude',
        'longitude',
        'temperature',
      ];
      break;
    case SamsungHealthAndroid.Types.UvExposure:
      properties = [
        'accuracy',
        'altitude',
        'latitude',
        'longitude',
        'uv_index',
      ];
      break;
    default:
      throw new Error(`Type ${type} is not supported`);
  }

  return {
    ...props,
    properties,
  };
};

export default SamsungHealthAndroid as SamsungHealthAndroidType;
