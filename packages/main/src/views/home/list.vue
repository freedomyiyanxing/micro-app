<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/21
* @project vue-project
*
-->
<template>
  <h1>home / list.vue</h1>
  <div style="height: 400px; overflow: auto">
    <div v-for="(item, idx) of tableData" style="display: flex">
      <span style="margin-right: 40px">{{idx + 1}}</span>
      <span>{{item.name}}</span>
      <span>{{item.salesOrderSn}}</span>
      <span>{{item.customerName}}</span>
      <span>{{item.tenant}}</span>
      <span>{{item.createUserName}}</span>
      <span>{{item.approveDate}}</span>
      <span>{{item.orderCanal}}</span>
      <span>{{item.updateTime}}</span>
      <span>{{item.enterpriseSn}}</span>
    </div>
  </div>

</template>

<script setup>
defineOptions({
  name: '/list'
});
import { shallowRef } from 'vue';

const tableData = shallowRef(Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  name: `${index} - index`,
  "salesOrderSn": "SHTDZ-DD23112000136",
  "mallOrderSn": "",
  "orderCanal": 2,
  "orderType": 1,
  "detailAddress": "",
  "isErrorOrder": -1,
  "errorReason": "",
  "customerName": "握不住的盛夏",
  "mallCompanyName": "握不住的盛夏",
  "customerId": 79494,
  "enterpriseSn": "SHT00000281",
  "agreement": "",
  "currency": 2,
  "taxRate": 0.13,
  "exchangeRate": 1,
  "priceNoTaxAmount": 3.54,
  "priceAmount": 4,
  "convertPriceAmount": 4,
  "needPayPriceAmount": 4,
  "seller": "何倩",
  "sellerAssistant": "何倩",
  "tenant": "圣禾堂（深圳）电子科技有限公司",
  "billingDate": "2023-11-14",
  "createTime": "2023-11-20",
  "updateTime": "2023-11-20",
  "createUserName": "何倩",
  "updateUserName": "何倩",
  "approveStatus": 3,
  "approvePerson": "",
  "approveDate": "2023-11-20 17:53:54",
  "status": 3,
  "defaultDelivery": "2023-11-14"
})));
</script>

<style scoped lang="scss"></style>
