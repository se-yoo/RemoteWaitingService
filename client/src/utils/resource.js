export const rules = {
  required: value => !!value || '필수 입력사항입니다.',
  email: value => {
    const pattern = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
    // 이메일 값 없을때도 통과 (필수 아닐 시)
    return value === '' || value === undefined || pattern.test(value) || '이메일 형식이 올바르지 않습니다.';
  },
  password: value => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return pattern.test(value) || '8~16자 영문, 숫자, 특수문자를 사용하세요.';
  }
};