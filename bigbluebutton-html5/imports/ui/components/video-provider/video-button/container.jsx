import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { injectIntl } from 'react-intl';
import { withModalMounter } from '/imports/ui/components/modal/service';
import VideoPreviewContainer from '/imports/ui/components/video-preview/container';
import { notify } from '/imports/ui/services/notification';
import JoinVideoButton from './component';
import VideoButtonService from './service';
import VideoEndButton from './video-end';

import {
  validIOSVersion,
} from '/imports/ui/components/app/service';

const JoinVideoOptionsContainer = (props) => {
  const {
    isSharingVideo,
    isDisabled,
    handleJoinVideo,
    handleCloseVideo,
    baseName,
    intl,
    mountModal,
    isMobileNative,
    ...restProps
  } = props;

  const mountPreview = () => { mountModal(<VideoPreviewContainer fromInterface />); };

  return !isMobileNative && (
    <Fragment>
      <JoinVideoButton {...{
        handleJoinVideo: mountPreview, handleCloseVideo, isSharingVideo, isDisabled, ...restProps,
      }}
      />

      <VideoEndButton {...{
        handleJoinVideo: mountPreview, handleCloseVideo, isSharingVideo, isDisabled, ...restProps,
      }}
      />
    </Fragment>

  );
};

export default withModalMounter(injectIntl(withTracker(() => ({
  baseName: VideoButtonService.baseName,
  isSharingVideo: VideoButtonService.isSharingVideo(),
  isDisabled: VideoButtonService.isDisabled() || !Meteor.status().connected,
  videoShareAllowed: VideoButtonService.videoShareAllowed(),
  isMobileNative: navigator.userAgent.toLowerCase().includes('bbbnative'),
  notify,
  validIOSVersion,
}))(JoinVideoOptionsContainer)));
