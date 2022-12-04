import PushNotificationIOS from '@react-native-community/push-notification-ios';

const openNotification = (title: string, msg: string) => {
  PushNotificationIOS.addNotificationRequest({
    id: title,
    title: title,
    body: msg,
  });
};

export { openNotification };
