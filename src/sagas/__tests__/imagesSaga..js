import { getPage, handleImagesLoad } from '../imagesSaga';
import { runSaga } from 'redux-saga';

import { setImages,setError } from '../../actions';
import * as api from '../../api';

test('selector gives back the page', () => {
    const nextPage = 1;
    const state = { nextPage };
    const res = getPage(state);
    expect(res).toBe(nextPage);
});

test('should load images and handle them in case of success ', async () => {
    // dispatched actions
    const dispatchedActions = [];

    const mockedImages = ['abc', 'div'];
    api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));
    
    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action)
    }

    await runSaga(fakeStore, handleImagesLoad).toPromise();
    // console.log(dispatchedActions);

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

test('should handle error in case of fail ', async () => {
    // dispatched actions
    const dispatchedActions = [];

    const error = 'Some error is thrown';
    api.fetchImages = jest.fn(() => Promise.reject(mockedImages));
    
    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action)
    }

    await runSaga(fakeStore, handleImagesLoad).toPromise();
    // console.log(dispatchedActions);

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});