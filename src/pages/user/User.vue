<template>
  <div class='page-content user'>
    <div class="header">
      <div class="left-wrap">
        <img class="avatar" src="@img/avatar.png"/>
        <h2>{{date}}，琢磨先生</h2>
        <p>新的一天又开始了</p>
        <div class="task">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjihuadaichuli"></use>
          </svg>
          <span>未处理（13）</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshalou"></use>
          </svg>
          <span>处理中（13）</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconchuli"></use>
          </svg>
          <span>已处理（13）</span>
        </div>
      </div>
      <div class="right-wrap">
        <img src="@img/icon1.png"/>
      </div>
    </div>

    <div class="info">
      <h1 class="title">基本设置</h1>

      <el-form :model="ruleForm" class="form" :rules="rules" ref="ruleForm" 
        label-width="86px"
        label-position="top"
      >
        <el-form-item label="昵称" prop="name">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个人介绍" prop="desc">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input type="textarea" rows="4" v-model="ruleForm.desc"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        date: '',
        ruleForm: {
          name: '',
          email: '',
          phone: '',
          company: '',
          sex: false,
          sesc: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          phone: [
            { type: 'date', required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          company: [
            { type: 'date', required: true, message: '请输入公司', trigger: 'blur' }
          ],
          sex: [
            { type: 'array', required: true, message: '请选择性别', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      this.getDate()
    },
    methods: {
      getDate() {
        const d = new Date()
        const h = d.getHours()
        let date

        if(h >= 6 && h < 9) {
          date = '早上好'
        }else if(h >= 9 && h < 11) {
          date = '上午好'
        }else if(h >= 11 && h < 13) {
          date = '中午好'
        }else if(h >= 13 && h < 18) {
          date = '下午好'
        }else if(h >= 18 && h < 24) {
          date = '晚上好'
        }else if(h >= 0 && h < 6) {
          date = '很晚了，早点睡'
        }

        this.date = date
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>

<style lang="scss">
  .user {
    .icon {
      width: 1.4em;
      height: 1.4em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
</style>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;
    padding: 0 !important;
    background: transparent !important;

    .header {
      background: #fff;
      padding: 30px 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .left-wrap {
        .avatar {
          width: 110px;
          height: 110px;
          object-fit: cover;
          border-radius: 50%;
        }

        h2 {
          font-size: 30px;
          margin-top: 20px;
          font-weight: 500;
        }

        p {
          color: #9CA3AE;
          font-size: 14px;
          margin-top: 20px;
          display: none;
        }

        .task {
          margin-top: 30px;
          display: flex;
          align-items: center;

          span {
            color: #9CA3AE;
            font-size: 14px;
            margin-right: 30px;
            margin-left: 8px;
          }
        }
      }

      .right-wrap {
        display: flex;
        align-items: center;

        img {
          width: 230px;
        }
      }
    }

    .info {
      margin-top: 15px;
      background: #fff;

      .title {
        font-size: 22px;
        font-weight: 500;
        padding: 15px 40px;
        border-bottom: 1px solid #eee;
      }

      .form {
        padding: 30px 40px;
        box-sizing: border-box;
      }
    }
  }

  @media only screen and (max-width: $device-ipad) { 
    .page-content {

      .header {
        padding: 20px 20px;

        .left-wrap {
          .avatar {
            width: 90px;
            height: 90px;
          }

          h2 {
            font-size: 20px;
            margin-top: 20px;
          }

          .task {
            margin-top: 15px;

            .icon {
              width: 2.8em;
              height: 2.8em;
              vertical-align: -0.15em;
            }

            span {
              font-size: 15px;
            }
          }
        }

        .right-wrap {
          display: flex;
          align-items: center;

          img {
            display: none;
          }
        }
      }

      .info {

        .title {
          font-size: 18px;
          padding: 15px 20px;
        }

        .form {
          padding: 30px 20px;
        }
      }
    }
  }
</style>