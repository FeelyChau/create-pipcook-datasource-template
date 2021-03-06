import { DataSourceApi, DataSourceEntry, Sample, DataSourceMeta, DataAccessor } from '@pipcook/core';
/**
 * sample data type, it's the type of Sample.data
 */
type SampleDataType = Array<number>;
/**
 * The options for current script
 */
interface ScriptOption {
  // All the option could be undefined if user not passed in, so we should define it to be optional.
  url?: string;
}

/**
 * The implementation of DataAccessor, for `train`, `test` and `evaluate`
 */
class Accessor implements DataAccessor<SampleDataType> {
  constructor(
    private data: any
  ) {}

  // read single sample
  async next(): Promise<Sample<SampleDataType>> {
    throw new TypeError('not implemented');
  }

  // read data from source, return array of sample or null if no more data
  async nextBatch(batchSize: number): Promise<Array<Sample<SampleDataType>> | null> {
    throw new TypeError('not implemented');
  }

  // seek position
  async seek(pos: number): Promise<void> {
    throw new TypeError('not implemented');
  }
}

class DataSource implements DataSourceApi<SampleDataType> {
  test: Accessor;
  train: Accessor;
  evaluate?: Accessor;
  yourData: any;
  constructor(
    private url: string
  ) {}

  /**
   * construct data accessor here
   *   this.test = new Accessor(this.yourData.test);
   *   this.train = new Accessor(this.yourData.train);
   *   this.evaluate = new Accessor([]);
   */
  async init(): Promise<void> {
    throw new TypeError('not implemented');
  }

  async getDataSourceMeta(): Promise<DataSourceMeta> {
    throw new TypeError('not implemented');
  }
}

/**
 * This is the entry of datasource script
 */
const datasourceEntry: DataSourceEntry<SampleDataType> =
async (option: ScriptOption): Promise<DataSourceApi<SampleDataType>> => {
  const {
    url = ''
  } = option;
  if (!url) {
    throw new TypeError('url should be defined');
  }
  /**
   * return instance of DataSourceApi, this is a sample for Table
   */
  const dataSource = new DataSource(url);
  // prepare data here
  await dataSource.init();
  return dataSource;
};

export default datasourceEntry;
