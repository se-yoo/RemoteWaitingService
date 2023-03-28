export const rules = {
  required: (value) => !!value || "필수 입력사항입니다.",
  email: (value) => {
    const pattern = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
    // 이메일 값 없을때도 통과 (필수 아닐 시)
    return (
      value === "" ||
      value === undefined ||
      pattern.test(value) ||
      "이메일 형식이 올바르지 않습니다."
    );
  },
  password: (value) => {
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return pattern.test(value) || "8~16자 영문, 숫자, 특수문자를 사용하세요.";
  },
  phoneNumber: (value) => {
    const pattern = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
    return pattern.test(value) || "000-0000-0000 형식으로 입력해주세요.";
  }
};

export const terms = `개인정보보호법에 따라 웨잇에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.

1. 수집하는 개인정보
이용자는 회원가입을 하지 않아도 이벤트 참여하기, 참여한 이벤트 내용보기 등 웨잇 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 웨잇는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.

회원가입 시점에 웨잇이 이용자로부터 수집하는 개인정보는 아래와 같습니다.
- 회원 가입 시 필수항목으로 아이디, 비밀번호, 이름, 생년월일, 휴대폰번호, 이메일주소를 수집합니다.
서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
- 회원정보를 설정할 수 있습니다.
- 웨잇 내의 이벤트 참여하기 등 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘개인정보 이용 동의'를 받습니다.

서비스 이용 과정에서 쿠키, 서비스 이용 기록이 생성되어 수집될 수 있습니다. 
`;
