<template>
  <Content :style="{ padding: '0 16px 16px' }">
    <HeadInfos />
    <Card>
      <div>
        <div class="test-title-container">
          <h1>{{ this.exam.name }}</h1>
        </div>
        <div class="test-score-container">
          <span style="margin-right: 30px">总共: {{ this.exam.total }}题</span>
          <span>满分: {{ this.exam.score }}分</span>
        </div>

        <div class="question-container">
          <div class="question-wrap" v-for="(item, i) in this.exam.matter" :key="item._id">
            <div class="question-stem">
              <span>{{ indexList[i] }}</span>
              <span>、{{ item.stem }}</span>
              <span>（共 {{ item.num }} 题 共 {{ item.score }} 分）</span>
            </div>
            <div class="question-content">
              <div class="question-item" v-for="(question, i) in item.question" :key="question._id">
                <div class="question-title">
                  <div>{{ i + 1 }}. {{ question.stem }}
                    <span style="margin-left: 10px">
                      ({{ question.score }}分)
                    </span>
                  </div>
                  <div class="question-choice" v-for="choice in question.option" :key="choice.id" v-show="question.type === 1">
                    <div>{{ choice.choice }}. {{choice.content}}</div>
                  </div>
                  <div class="question-choice" v-for="choice in question.option" :key="choice.id" v-show="question.type === 2">
                    <div>{{ choice.choice }}. {{choice.content}}</div>
                  </div>
                  <div class="question-choice" v-for="judge in judge" :key="judge.id" v-show="question.type === 3">
                    <div>{{ judge.choice }}. {{judge.content}}</div>
                  </div>
                  <div class="question-choice" v-for="fill in question.fill" :key="fill.id" v-show="question.type === 4">
                    <div>{{ fill.index }}. {{fill.content}}</div>
                  </div>
                </div>
                <div class="answer-container">
                  <Collapse v-model="question.answerFlag">
                    <Panel name="1">
                      正确答案:
                      <span>{{ question.answer }}</span>
                      <p slot="content">
                        <span>解析：</span>
                        <span v-html="question.analysis"></span>
                      </p>
                    </Panel>
                  </Collapse>
                </div>
                <div class="answer-action">
                  <Button type="success" @click="updateQuestion(question, item)">修改</Button>
                  <Button type="error" @click="deleteQuestion(question, item)">删除</Button>
                </div>
              </div>
            </div>
            <div class="question-action">
              <Button type="primary" @click="openAddQuestionDrawer(item)"
                >添加题目</Button
              >
            </div>
          </div>
        </div>

        <div class="test-stem-container">
          <Button class="stem-btn" type="primary" @click="openAddStemDrawer"
            >添加大题干</Button
          >
          <!-- <Button class="save-btn" type="success">保存</Button> -->
        </div>
        <Drawer
          v-model="addStemDrawer"
          title="添加大题干"
          width="40"
          class="add-stem-drawer"
          :mask-closable="false">
          <Input type="textarea" v-model="stem" maxlength="1000" :show-word-limit=true :rows=8 placeholder="请输入大题干"> 
 
          </Input>
          <div class="stem-drawer-footer">
            <Button class="actionButton" @click="closeAddStemDrawer"
              >取消</Button
            >
            <Button class="actionButton" @click="submitBigStem" type="primary"
              >添加</Button
            >
          </div>
        </Drawer>
        <Drawer
          v-model="addQuestionDrawer"
          title="添加题目"
          width="100"
          :mask-closable="false"
          class="add-question-drawer"
        >
          <div class="qustion-type-score">
            <h3>题型和分值:</h3>
            <div class="qustion-stem">
              <Select v-model="question.type" clearable style="width:200px" @on-change="initQuestion">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div>
              <Input v-model="question.score" type="number">
                <span slot="append">分</span>
              </Input>
            </div>
          </div>

          <div class="question-stem-editor">
            <h3>题干:</h3>
            <Input type="textarea" v-model="question.stem" maxlength="1000" :show-word-limit=true :rows=8 placeholder="请输入题干"> </Input>
          </div>

          <div class="question-one-choice" v-show="this.question.type == 1">
            <h3>选项:</h3>
            <RadioGroup v-model="question.answer" vertical>
              <div class="one-choice-item" v-for="item in question.option" :key="item.choice">
                <Radio :label=item.choice class="radio">
                  <span>{{ item.choice }}</span>
                </Radio>
                <Input class="one-choice-contet" v-model="item.content" placeholder="请输入选项内容">
                </Input>
              </div>
              <!-- <div class="one-choice-item">
                <Radio label="2" class="radio">
                  <span>B</span>
                </Radio>
                <Input class="one-choice-contet" placeholder="请输入选项内容">
                </Input>
              </div> -->
            </RadioGroup>
            <div>
              <Button type="success" @click="addChoice" class="add-item-btn">添加选项</Button>
              <Button type="error" @click="removeChoice">删除选项</Button>
            </div>
          </div>
          <div class="question-one-choice" v-show="this.question.type == 2">
            <h3>选项:</h3>
            <CheckboxGroup  v-model="question.answers" vertical>
              <div class="one-choice-item" v-for="item in question.option" :key="item.choice">
                <Checkbox  :label=item.choice class="radio">
                  <span>{{ item.choice }}</span>
                </Checkbox >
                <Input class="one-choice-contet" v-model="item.content" placeholder="请输入选项内容">
                </Input>
              </div>
            </CheckboxGroup>
            <div>
              <Button type="success" @click="addChoice" class="add-item-btn">添加选项</Button>
              <Button type="error" @click="removeChoice">删除选项</Button>
            </div>
          </div>
          <div class="question-one-choice" v-show="this.question.type == 3">
            <h3>选项:</h3>
            <RadioGroup v-model="question.answer" vertical>
              <div class="one-choice-item" v-for="item in judge" :key="item.choice">
                <Radio :label=item.choice class="radio">
                  <span>{{ item.choice }}</span>
                </Radio>
                <Input class="one-choice-contet" v-model="item.content" placeholder="请输入选项内容">
                </Input>
              </div>
            </RadioGroup>
          </div>
          <div class="question-one-choice" v-show="this.question.type == 4">
            <h3>选项:</h3>
            <div class="one-choice-item" v-for="item in question.fill" :key="item.index">
              <span class="radio">{{ item.index }}</span>
              <Input class="one-choice-contet" placeholder="请输入填空项答案内容" v-model="item.content"></Input>
            </div>
            <div>
              <Button type="success" @click="addFillItem" class="add-item-btn">添加填空项</Button>
              <Button type="error" @click="removeFillItem">删除选项</Button>
            </div>
          </div>
  
          <div class="question-analysis">
            <h3>解析:</h3>
            <div ref="editor"  style="text-align:left"></div>
          </div>

          <div class="stem-drawer-footer">
            <Button class="actionButton" @click="closeAddQuestionDrawer"
              >取消</Button
            >
            <Button class="actionButton" type="primary" @click="submitQuestion">添加</Button>
          </div>
        </Drawer>
      </div>
    </Card>
  </Content>
</template>

<script>
import HeadInfos from '@/components/HeadInfos';
import { mapState, mapMutations } from 'vuex';
import E from 'wangeditor';

export default {
  components: {
    HeadInfos
  },
  data() {
    return {
      editor: {},
      exam: {},
      addStemDrawer: false,
      addQuestionDrawer: false,
      answerFlag: '1',
      stem: '',
      stemId: '',
      question: {
        type: 0,
        score: 0,
        stem: '',
        analysis: '',
        answer: '',
        paperId: '',
        answers: [],
        option: [
          {
            choice: 'A',
            content: '',
          }, 
          {
            choice: 'B',
            content: '',
          },
          {
            choice: 'C',
            content: '',
          },
          {
            choice: 'D',
            content: '',
          }
        ],
        fill: [
          {
            index: 1,
            content: '',
          },
        ]
      },

      judge: [
        {
          choice: 'A',
          content: '对'
        },
        {
          choice: 'B',
          content: '错'
        }
      ],
      typeList: [
        {
          value: 1,
          label: '单选题',
        },
        {
          value: 2,
          label: '多选题',
        },
        {
          value: 3,
          label: '判断题',
        },
        {
          value: 4,
          label: '填空题',
        },
        {
          value: 5,
          label: '简答题',
        },
      ],
      indexList: [ '一', '二', '三', '四', '五', '六', '七', '八', '九' ]
    };
  },
  computed: {
    ...mapState(['userInfo', 'paperId']),
  },
  methods: {
    ...mapMutations(['handlePaperId']),
    openAddStemDrawer() {
      this.addStemDrawer = true;
    },
    closeAddStemDrawer() {
      this.addStemDrawer = false;
    },
    openAddQuestionDrawer(item) {
      this.stemId = item._id
      this.addQuestionDrawer = true;
    },
    closeAddQuestionDrawer() {
      this.addQuestionDrawer = false;
    },
    submitBigStem() {
      console.log(this.stem);
      this.$api.exam.create_stem({ _id: this.paperId, name: this.stem })
      .then((res) => {
        this.$Message.success(res.messages[0])
        this.closeAddStemDrawer()
        this.getExam(this.paperId)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    submitQuestion() {
      this.question.paperId = this.paperId
      this.question.stemId = this.stemId
      this.$api.exam.create_question(this.question)
      .then(res => {
        this.$Message.success('添加成功')
        this.closeAddQuestionDrawer()
        this.getExam(this.paperId)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateQuestion(question, item) {
      this.openAddQuestionDrawer(item)
      // this.$api.exam.get_exam_info({ id: this.paperId })
      // .then(res => {
      //   this.question = res.data
      //   console.log(this.exam)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    deleteQuestion(question, item) {
      console.log(item)
      const params = {
        id: question._id,
        paperId: this.paperId,
        stemId: item._id
      }
      this.$api.exam.delete_question(params)
      .then(res => {
        this.$Message.error(res.messages[0])
        this.getExam(this.paperId)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    createExam() {
      this.$api.exam.create_exam()
      .then((res) => {
        this.handlePaperId(res.data)
        this.getExam(this.paperId)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getExam(id) {
      this.$api.exam.get_exam_info({ id: id })
      .then(res => {
        this.exam = res.data
        console.log(this.exam)
      })
      .catch(err => {
        console.log(err)
      })
    },
    initQuestion() {
      this.question.answer = ''
      this.question.answers = []
    },
    addFillItem() {
      let length = this.question.fill.length
      this.question.fill.push({ index: length + 1, content: ''})
    },
    addChoice() {
      let str = this.generateBig()
      let index
      this.question.option.forEach((item) => {
        index = str.indexOf(item.choice) 
      })
      this.question.option.push({ choice: str[index + 1], content: '' })
    },
    removeChoice() {
      this.question.option.pop()
    },
    removeFillItem() {
      this.question.fill.pop()
    },
    generateBig() {
      let str = [];
      for(let i = 65; i < 91; i++){
        str.push(String.fromCharCode(i));
      }
      return str;
    }
  },
  watch: {},
  created() {
    // if (!this.userInfo) {
    //   console.log('先登录');
    //   location.pathname = '/';
    //   return;
    // }
    // if (this.userInfo.role !== 0) {
    //   console.log('权限不足');
    //   location.pathname = '/';
    //   return;
    // }
    if(this.paperId) {
      console.log('haha')
      this.getExam(this.paperId)
      return
    }
    this.createExam()
  },
  mounted() {
    let editor = new E(this.$refs.editor);
    this.editor = editor;
    editor.customConfig.onchange = html => {
      this.question.analysis = html;
    };
    editor.create();
  }
};
</script>

<style lang="less">
.test-title-container {
  width: 800px;
  text-align: center;
  margin: 0 auto;
}
.test-score-container {
  width: 400px;
  text-align: center;
  margin: 15px auto;
}
.test-stem-container {
  width: 40%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  .stem-btn {
    width: 100%;
  }
  .save-btn {
    width: 45%;
  }
}
.add-stem-drawer {
  .ivu-drawer-right {
    height: 360px !important;
    right: 30% !important;
    margin-top: 160px;
  }
  .ivu-drawer-mask,
  .ivu-drawer-wrap {
    z-index: 20000 !important;
  }
  .stem-drawer-footer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 20px 16px;
    text-align: right;
    background: #e8e8e8;
    .actionButton {
      width: 100px;
    }
  }
}

.add-question-drawer {
  .stem-drawer-footer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    left: 0;
    border-top: 1px solid #FFFFFF;
    padding: 20px 16px;
    margin-top: 20px;
    background: #e8e8e8;
    .actionButton {
      width: 300px;
    }
  }
  .qustion-type-score {
    display: flex;
    line-height: 32px;
    margin-bottom: 20px;
    .qustion-stem {
      margin: 0 30px;
      .ivu-select-dropdown {
        z-index: 100000;
      }
    }
  }
  .question-stem-editor {
    margin-bottom: 20px;
    h3 {
      margin-bottom: 10px;
    }
  }
  .question-one-choice {
    h3 {
      margin-bottom: 10px;
    }
    .add-item-btn {
      margin-right: 30px;
    }
    .one-choice-item {
      display: flex;
      margin-bottom: 15px;
      .one-choice-contet {
        width: 800px;
        .ivu-input {
          border-radius: 0 5px 5px 0;
          height: 40px;
          font-size: 16px;
          line-height: 40px;
        }
      }
      .radio {
        background-color: #EEEEEE;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        margin: 0;
        border-radius: 5px 0 0 5px;
      }
    }
  }
  .question-analysis {
    margin-top: 20px;
    h3 {
      margin-bottom: 10px;
    }
  }
}

.question-container {
  .question-wrap {
    padding: 20px;
    margin-bottom: 25px;
    border: grey 1px solid;
    border-radius: 5px;
    .question-content {
      .question-item {
        display: flex;
        justify-content: start;
        padding: 15px;
        margin: 20px 10px;
        border: solid 1px black;
        border-radius: 5px;
        .question-title {
          width: 45%;
          .question-choice {
            margin-left: 12px;
            margin-top: 5px;
          }
        }
        .answer-container {
          width: 35%;
          margin-left: 2%;
          .ivu-collapse-header {
            height: 30px !important;
            line-height: 30px !important;
          }
        }
        .answer-action {
          margin-left: 10px;
          button {
            margin-left: 20px;
            height: 38px;
          }
        }
      }
    }
    .question-action {
      padding: 10px;
    }
  }
}
.ivu-checkbox-border {
  margin-bottom: 10px;
}
</style>
