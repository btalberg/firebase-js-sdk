/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF unknown KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '../../test/setup';

import { stub } from 'sinon';
import { expect } from 'chai';
import { Api } from '../services/api_service';

import {
  getVisibilityState,
  VisibilityState,
  getServiceWorkerStatus,
  getEffectiveConnectionType
} from './attributes_utils';

describe('Firebase Performance > attribute_utils', () => {
  describe('#getServiceWorkerStatus', () => {
    it('returns unsupported when service workers unsupported', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {}
      } as unknown) as Api);

      expect(getServiceWorkerStatus()).to.be.eql(1);
    });

    it('returns controlled when service workers controlled', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          serviceWorker: {
            controller: {}
          }
        }
      } as unknown) as Api);

      expect(getServiceWorkerStatus()).to.be.eql(2);
    });

    it('returns uncontrolled when service workers uncontrolled', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          serviceWorker: {}
        }
      } as unknown) as Api);

      expect(getServiceWorkerStatus()).to.be.eql(3);
    });
  });

  describe('#getVisibilityState', () => {
    it('returns visible when document is visible', () => {
      stub(Api, 'getInstance').returns(({
        document: {
          visibilityState: 'visible'
        }
      } as unknown) as Api);
      expect(getVisibilityState()).to.be.eql(VisibilityState.VISIBLE);
    });

    it('returns hidden when document is hidden', () => {
      stub(Api, 'getInstance').returns(({
        document: {
          visibilityState: 'hidden'
        }
      } as unknown) as Api);
      expect(getVisibilityState()).to.be.eql(VisibilityState.HIDDEN);
    });

    it('returns prerender when document is prerender', () => {
      stub(Api, 'getInstance').returns(({
        document: {
          visibilityState: 'prerender'
        }
      } as unknown) as Api);
      expect(getVisibilityState()).to.be.eql(VisibilityState.PRERENDER);
    });

    it('returns unknown when document is unknown', () => {
      stub(Api, 'getInstance').returns(({
        document: {
          visibilityState: 'unknown'
        }
      } as unknown) as Api);
      expect(getVisibilityState()).to.be.eql(VisibilityState.UNKNOWN);
    });
  });

  describe('#getEffectiveConnectionType', () => {
    it('returns EffectiveConnectionType.CONNECTION_SLOW_2G when slow-2g', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          connection: {
            effectiveType: 'slow-2g'
          }
        }
      } as unknown) as Api);
      expect(getEffectiveConnectionType()).to.be.eql(1);
    });

    it('returns EffectiveConnectionType.CONNECTION_2G when 2g', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          connection: {
            effectiveType: '2g'
          }
        }
      } as unknown) as Api);
      expect(getEffectiveConnectionType()).to.be.eql(2);
    });

    it('returns EffectiveConnectionType.CONNECTION_3G when 3g', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          connection: {
            effectiveType: '3g'
          }
        }
      } as unknown) as Api);
      expect(getEffectiveConnectionType()).to.be.eql(3);
    });

    it('returns EffectiveConnectionType.CONNECTION_4G when 4g', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          connection: {
            effectiveType: '4g'
          }
        }
      } as unknown) as Api);
      expect(getEffectiveConnectionType()).to.be.eql(4);
    });

    it('returns EffectiveConnectionType.UNKNOWN when unknown connection type', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          connection: {
            effectiveType: '5g'
          }
        }
      } as unknown) as Api);
      expect(getEffectiveConnectionType()).to.be.eql(0);
    });

    it('returns EffectiveConnectionType.UNKNOWN when no effective type', () => {
      stub(Api, 'getInstance').returns(({
        navigator: {
          connection: {}
        }
      } as unknown) as Api);
      expect(getEffectiveConnectionType()).to.be.eql(0);
    });
  });
});
