import counterReducer, {
  initializeMissions,
    editMission,
    addMission
} from './missionSlice';

describe('counter reducer', () => {
  // const initialState: MissionListState = {
  //   value: 3,
  //   status: 'idle',
  // };
  it('should handle initial state', () => {
    // expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
    //   value: 0,
    //   status: 'idle',
    // });
  });
  it('should handle increment', () => {
    // const actual = counterReducer(initialState, increment());
    expect(0).toEqual(4);
    expect(0).toEqual(4);
  });
});
