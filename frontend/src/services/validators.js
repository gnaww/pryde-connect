import phone from 'phone';
import normalizeURL from 'normalize-url';

export const isValidURL = url => {
    try {
      new URL(normalizeURL(url));
      return true;
    } catch (_) {
      return false;
    }
};

export const isValidEmail = email => {
    const re =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
};

export const isValidPhoneNumber = phoneNumber => {
    return phone(phoneNumber).length !== 0;
}
