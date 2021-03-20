<template>
    <div id="message">
        <h1>信息表</h1>
        <div>
        <input type="text" v-model="seachthing"> <button @click="doGet(seachthing)">搜索</button>
        </div>
        <br>
        <div>
          <el-table :data="seachData" border style="width: 100%">
        <!-- 动态循环的列表 -->
        <template  v-for="(item, index) in tableLabel">
          <el-table-column :key="index" :prop="item.prop" :label="item.label" width="100"> </el-table-column>
        </template>
        <!-- 固定的列：详细 -->
        <el-table-column label="详细">
          <template >
            <el-button type="info" @click="select">详细</el-button>
          </template>
        </el-table-column>
      </el-table>
        </div>
        <div><input type="text" v-model="只读" disabled></div>
    </div>
</template>

<script>

export default {
  name: 'message',
  data () {
    return {
      seachthing: '',
      seachData: '',
      tableData: [],
      tableLabel: [
        {label: '序号', prop: 'id'},
        {label: '名字', prop: 'name'},
        {label: '年龄', prop: 'age'},
        {label: '性别', prop: 'sex'},
        {label: '生日', prop: 'birth'}
      ],
      inputable: false
    }
  },
  methods: {
    doGet (item) {
      this.seachthing = item
      // 发起get请求
      this.$axios.get('http://127.0.0.1:8080/user/list').then((response) => {
        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        console.log(response)
        console.log(response.data)
        this.tableData = response.data
      }).catch((error) => {
        // catch 指请求出错的处理
        console.log(error)
      })
        if (!this.seachthing) {
          this.seachData = this.tableData
        }

        this.seachthing = this.seachthing.trim.toLowerCase()

        this.seachData = this.tableData.filter(function (item) {
          if (item.name.toLowerCase().indexOf(this.seachthing) !== -1) {
            return item
        }
    })
  }
}
}
</script>

<style scoped>
button {
    background-color: #008CBA;
    padding: 10px 20px;
    border: none;
    font-size: 18px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    display: block;
  }

</style>
