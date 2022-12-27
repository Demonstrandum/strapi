'use strict';

const utils = require('../../transfer/utils');

const mockDataTransfer = {
  createRemoteStrapiDestinationProvider: jest.fn(),
  createLocalStrapiSourceProvider: jest.fn(),
  createTransferEngine: jest.fn().mockReturnValue({
    transfer: jest.fn().mockReturnValue(Promise.resolve({})),
  }),
};

jest.mock(
  '@strapi/data-transfer',
  () => {
    return mockDataTransfer;
  },
  { virtual: true }
);

const transferCommand = require('../../transfer/transfer');

const exit = jest.spyOn(process, 'exit').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('../../transfer/utils');

const destinationUrl = 'ws://strapi.com';

describe('transfer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('uses destination url provided by user without authentication', async () => {
    await transferCommand({ from: 'local', to: destinationUrl });

    expect(mockDataTransfer.createRemoteStrapiDestinationProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        url: destinationUrl,
      })
    );

    expect(exit).toHaveBeenCalled();
  });

  it('uses destination url provided by user with authentication', async () => {
    // TODO when authentication is implemented
  });

  it('uses restore as the default strategy', async () => {
    await transferCommand({ from: 'local', to: destinationUrl });

    expect(mockDataTransfer.createRemoteStrapiDestinationProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        strategy: 'restore',
      })
    );
  });
  it('uses destination url provided by user without authentication', async () => {
    await transferCommand({ from: 'local', to: destinationUrl });

    expect(mockDataTransfer.createRemoteStrapiDestinationProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        url: destinationUrl,
      })
    );

    expect(exit).toHaveBeenCalled();
  });

  it('uses destination url provided by user with authentication', async () => {
    // TODO when authentication is implemented
  });

  it('uses restore as the default strategy', async () => {
    await transferCommand({ from: 'local', to: destinationUrl });

    expect(mockDataTransfer.createRemoteStrapiDestinationProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        strategy: 'restore',
      })
    );
  });

  it('uses local strapi instance when local specified', async () => {
    await transferCommand({ from: 'local', to: destinationUrl });

    expect(mockDataTransfer.createLocalStrapiSourceProvider).toHaveBeenCalled();
    expect(utils.createStrapiInstance).toHaveBeenCalled();

    expect(exit).toHaveBeenCalled();
  });

  it('creates the transfer engine successfully', async () => {
    await transferCommand({ from: 'local', to: destinationUrl });
  });
});
