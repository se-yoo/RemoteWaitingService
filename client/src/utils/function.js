import moment from "moment";

/**
 * @method formatKorTime
 * @param {String} date 
 * @returns {String} YYYY-MM-DD 오전/오후 h시
 * @note 시간 포맷 함수(YYYY-MM-DD 오전/오후 h시)
 */
export const formatKorTime = (date) => {
  const targetDate = new Date(date);
  const ampm = targetDate.getHours() >= 12 ? '오후' : '오전';
  const format = `YYYY-MM-DD ${ampm} h시`;
  return moment(targetDate).format(format);
}

/**
 * @method getPageCount
 * @param {Number} listLength 아이템 목록 전체 개수
 * @param {Number} rowsPerPage 페이지 별 아이템 전시 개수
 * @returns {Number} 페이지 수
 * @note 몇 페이지가 필요한지 계산하여 반환하는 함수
 * @email se.yoo@naviworks.com
 */
export const getPageCount = (listLength, rowsPerPage) => {
  return Math.ceil(Number(listLength) / Number(rowsPerPage));
};

/**
 * @method getPageItems
 * @param {Number} page 현재 페이지
 * @param {Array} contents 아이템 목록
 * @param {Number} rowsPerPage 페이지 별 아이템 전시 개수
 * @returns {Array} 현재 페이지의 아이템 목록
 * @note 현재 페이지의 아이템 목록을 반환하는 함수
 * @email se.yoo@naviworks.com
 */
export const getPageItems = function(page, contents, rowsPerPage) {
  return (rowsPerPage > 0
    ? contents.slice(
      (page - 1) * rowsPerPage, 
      (page - 1) * rowsPerPage + rowsPerPage
    )
    : contents
  );
};

/**
 * @method getSeq
 * @param {Number} page 현재 페이지
 * @param {Number} rowsPerPage 페이지 별 아이템 전시 개수
 * @param {Number} index 현재 페이지에서 아이템 순서
 * @returns {Number} 아이템 순서
 * @note 현재 아이템 순서를 반환하는 함수
 * @email se.yoo@naviworks.com
 */
export const getSeq = function(page, rowsPerPage, index) {
  return (page - 1) * rowsPerPage + index + 1;
};