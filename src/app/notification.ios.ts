import PushNotificationIOS from '@react-native-community/push-notification-ios';

const openNotification = (title: string, msg: string) => {
  PushNotificationIOS.addNotificationRequest({
    id: 'Result',
    title: title,
    body: msg,
  });
};

export { openNotification };
