<template>
  <v-app id="app">
    <v-content>
      <div id="wrapper" class="viewport_wrapper">
        <!-- <div class="display-2">Guessing her mind</div> -->
        <div class="title_wrapper">
          <div class="word_align">
            <div class="display-4 bold">CS372</div>
            <div class="display-1 ma-2 grey_text">Team 11</div>
            <div class="display-2 ma-2">Guessing Your Mind</div>
          </div>
        </div>
        <div class="mask_phone">
          <div class="main_wrapper">
            <div class="analysis_chat opened">
              <div class="status_bar">
                {{ timestamp }}
                <v-spacer />
                {{"CS372 Team 11"}}
              </div>
              <div class="chat_header">
                <div class="chat_header_name">고양휘</div>
              </div>
              <div class="chat_my_msg" v-if="showAsk">
                <div class="chat_meta">
                  <div class="meta_pad pad_16" v-bind:class="{ pad_31 : analysis}" />
                  <div class="read_number">{{analysisDone ? "" : "1"}}</div>
                  <div
                    class="timestamp"
                    v-if="!analysis || (analysis && (startTime !== analysisTime))"
                  >{{startTime}}</div>
                </div>
                <div class="chat_my_msg_bubble my_msg_first">양휘야, 혹시</div>
              </div>
              <div class="chat_my_msg" v-if="showConsonants">
                <div class="chat_meta">
                  <div class="meta_pad pad_16" v-bind:class="{ pad_31 : analysisDone}" />
                  <div class="read_number">{{analysisDone ? "" : "1"}}</div>
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
                <div class="chat_my_msg_bubble">{{ consonants }} 가 무슨 의미야?</div>
              </div>
              <div class="chat_cat_msg" v-if="showFirst">
                <div class="chat_cat_avatar" />
                <div class="chat_cat_msg_bubble cat_msg_first">
                  아 그건 말야
                  <div class="chat_cat_name">고양휘</div>
                </div>
                <div class="chat_cat_meta" v-if="current == 'first'">
                  <div class="meta_pad pad_39" />
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
              </div>
              <div class="chat_cat_msg" v-if="showSecond">
                <div class="chat_cat_msg_bubble">{{analysisResult}}</div>
                <div class="chat_cat_meta" v-if="current == 'second'">
                  <div class="meta_pad pad_14" />
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
              </div>
              <div class="chat_cat_msg" v-if="showThird">
                <div class="chat_cat_msg_bubble">라는 뜻이야!</div>
                <div class="chat_cat_meta" v-if="current == 'third'">
                  <div class="meta_pad pad_14" />
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
              </div>

              <div class="chat_footer">
                <div class="chat_footer_toolbar">
                  <v-btn text color="#898989" :disabled="analysis" @click="showGuide">
                    <v-icon left>mdi-file-document-outline</v-icon>가이드
                  </v-btn>
                  <v-btn text color="#898989" :disabled="analysis" @click="insertSample">
                    <v-icon left>mdi-lightbulb</v-icon>예시입력
                  </v-btn>
                  <v-spacer />
                  <v-btn text color="#898989" @click="closeAnalysis">
                    <v-icon left>mdi-restore</v-icon>다시하기
                  </v-btn>
                </div>
                <div class="chat_footer_input">
                  <div class="chat_footer_text">
                    <v-text-field
                      v-model="consonants"
                      color="white"
                      counter
                      maxlength="90"
                      placeholder="초성을 입력하세요."
                      :rules="[rules.required, rules.kor]"
                      :disabled="analysis"
                      @blur="scrollToTop"
                    ></v-text-field>
                  </div>

                  <div class="chat_footer_action">
                    <div
                      class="chat_footer_button"
                      v-bind:class="{ button_activated : valid && !analysis}"
                      @click="doAnalysis"
                    >전송</div>
                  </div>
                </div>
              </div>
              <v-dialog v-model="guide">
                <v-card>
                  <v-card-title class="headline lighten-2" primary-title>가이드</v-card-title>

                  <v-card-text>
                    <p>입력 란에 분석하고 싶은 초성을 입력하세요!</p>
                    <p>ex ) 내가 너 많이 좋아해! -> ㄴㄱ ㄴ ㅁㅇ ㅈㅇㅎ!</p>
                    <br />
                    <p>-유의 사항-</p>

                    <li>입력 가능한 문자는 한국어 초성, 한국어 글자, 공백 및 특수기호 입니다.</li>
                    <li>입력 가능한 특수기호 : !@#$%^&*)(+=._-</li>
                    <li>영어는 입력할 수 없습니다.</li>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="guide = false">닫기</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    valid() {
      if (!this.consonants || this.consonants.trim().length == 0) {
        return false;
      }

      const pattern = /^[\u3131-\uD79D0-9!@#$%^&*)(+=._-\s]+$/;
      if (!pattern.test(this.consonants)) {
        return false;
      }

      return true;
    }
  },

  data: () => ({
    timestamp: "",
    open: false,
    consonants: "",
    rules: {
      required: value => !!value || "최소 한 글자 이상 입력해주세요.",
      kor: value => {
        const pattern = /^[\u3131-\uD79D0-9!@#$%^&*)(+=._-\s]+$/;
        return pattern.test(value) || "허용되지 않는 입력 값입니다.";
      }
    },
    guide: false,
    sample: "ㄴㄱ ㄴ ㅁㅇ ㅈㅎㅇ!",
    analysis: false,
    startTime: null,
    analysisTime: null,
    analysisResult: null,
    analysisDone: false,
    showAsk: false,
    showConsonants: false,
    showFirst: false,
    showSecond: false,
    showThird: false,
    current: null
  }),

  created() {
    setInterval(() => {
      this.timestamp = this.getNow();
    }, 1000);
  },

  mounted() {
    function calcVH() {
      var vH = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      document
        .getElementById("wrapper")
        .setAttribute("style", "height:" + vH + "px;");
      document
        .getElementById("app")
        .setAttribute("style", "height:" + vH + "px;");
    }
    calcVH();
    window.addEventListener("onorientationchange", calcVH, true);
    window.addEventListener("resize", calcVH, true);
    this.scrollToTop();
    this.startChat();
  },

  methods: {
    getNow() {
      const today = new Date();
      let time = today.getHours() + ":";
      if (today.getMinutes() < 10) {
        time += "0";
      }
      time += today.getMinutes();
      return time;
    },
    showGuide() {
      this.guide = true;
    },
    insertSample() {
      this.consonants = this.sample;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async startChat() {
      await this.sleep(1500);
      this.startTime = this.getNow();
      this.showAsk = true;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async doAnalysis() {
      if (!this.valid || this.analysis) {
        return;
      }

      const today = new Date();
      let time = today.getHours() + ":";
      if (today.getMinutes() < 10) {
        time += "0";
      }
      time += today.getMinutes();
      this.analysisTime = time;
      this.analysis = true;
      this.showConsonants = true;

      //API call
      await this.sleep(2000);

      this.analysisResult = "내가 너 많이 좋아해!";
      this.analysisDone = true;

      await this.sleep(1500);
      this.current = "first";
      this.showFirst = true;
      await this.sleep(1500);
      this.current = "second";
      this.showSecond = true;
      await this.sleep(1500);
      this.current = "third";
      this.showThird = true;
    },
    closeAnalysis() {
      this.startTime = null;
      this.analysisTime = null;
      this.consonants = null;
      this.showAsk = false;
      this.showConsonants = false;
      this.showFirst = false;
      this.showSecond = false;
      this.showThird = false;
      this.current = null;
      this.analysis = false;
      this.analysisDone = false;
      this.analysisResult = null;
      this.startChat();
    }
  }
};
</script>

<style>
/* Prevent zoom */
select,
input,
textarea {
  font-size: 16px;
}

.bold {
  font-weight: bold !important;
}

.grey_text {
  color: #a9a9a9;
}

.viewport_wrapper {
  width: 100vw;
  display: flex;
  background-image: url("assets/cafe_background.jpg");
  background-size: cover;
  background-position: center center;
  z-index: -1;
}

.title_wrapper {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  position: relative;
}

.title_wrapper:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0%;
  width: 0;
  height: 0;
  border-left: 200px solid transparent;
  border-bottom: 100vh solid transparent;
  border-left-color: white;
  border-right: 0;
  border-top: 0;
  margin-right: -200px;
}

.mask_phone {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  width: 850px;
  height: 850px;
  background-image: url("assets/iphone_prortrait.png");
  background-size: contain;
  background-position: center center;
  position: relative;
}

.main_wrapper {
  width: 315px;
  height: 626px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  bottom: 187px;
  left: 220px;
  border-radius: 10px;
}

.status_bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: 600;
}

.analysis_chat {
  position: absolute;
  background: rgb(193, 208, 219);
  width: 0;
  height: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.3s ease-in-out;
}

.opened {
  width: 100%;
  transition: 0.3s ease-in-out;
}

.chat_header {
  width: 100%;
  display: flex;
  align-items: center;
}

.chat_header_name {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.chat_my_msg {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.chat_meta {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25px;
  font-size: 8px;
}

.meta_pad {
  width: 100%;
}
.pad_14 {
  height: 14px;
}

.pad_16 {
  height: 16px;
}

.pad_31 {
  height: 31px;
}

.pad_39 {
  height: 39px;
}

.timestamp {
  font-size: 10px;
  color: #898989;
}

.read_number {
  text-align: end;
  color: #fbe44c;
  font-weight: bold;
  font-size: 10px;
  margin-bottom: -2px;
  margin-right: 5px;
}

.chat_my_msg_bubble {
  background: #fbe44c;
  max-width: 70%;
  padding: 8px;
  border-radius: 10px;
  position: relative;
  margin-right: 15px;
  font-size: 12px;
  margin-top: 10px;
}
.my_msg_first:after {
  content: "";
  position: absolute;
  right: 0;
  top: 10%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: #fbe44c;
  border-right: 0;
  border-top: 0;
  margin-right: -5px;
}

.chat_cat_msg {
  width: 100%;
  display: flex;
  padding-left: 10px;
  margin-top: 10px;
}

.chat_cat_meta {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 25px;
  font-size: 8px;
  margin-left: 5px;
}

.chat_cat_name {
  position: absolute;
  top: -20px;
  left: 0;
  color: #898989;
  font-size: 12px;
}

.chat_cat_avatar {
  height: 30px;
  width: 30px;
  border-radius: 12px;
  background: url("assets/cat.jpeg");
  background-size: cover;
}

.chat_cat_msg_bubble {
  background: white;
  max-width: 70%;
  padding: 8px;
  border-radius: 10px;
  position: relative;
  margin-left: 45px;
  font-size: 12px;
  margin-top: -5px;
}

.cat_msg_first {
  margin-top: 20px;
  margin-left: 15px;
}

.cat_msg_first:after {
  content: "";
  position: absolute;
  left: 0;
  top: 10%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: white;
  border-left: 0;
  border-top: 0;
  margin-left: -5px;
}

.chat_footer {
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  font-size: 14px;
  color: #898989;
}

.chat_footer_toolbar {
  width: 100%;
  padding: 5px;
  display: flex;
  background: #f9f9f9;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
}

.chat_footer_input {
  width: 100%;
  height: 80px;
  display: flex;
  border: 1px solid #d9d9d9;
  border-collapse: collapse;
}

.chat_footer_text {
  height: 80px;
  flex: 1;
  display: flex;
  padding: 10px;
  padding-top: 0px;
}

.chat_footer_action {
  width: 90px;
  height: 100%;
  display: flex;
  padding: 10px;
}

.chat_footer_button {
  width: 100%;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a9a9a9;
}

.button_activated {
  border: 1px solid #fbe44c;
  background: #fbe44c;
  color: black;
  cursor: pointer;
}

@media only screen and (max-width: 1500px) {
  .title_wrapper {
    display: none;
  }
}

@media only screen and (max-width: 850px) {
  html {
    overflow: hidden;
    scroll-behavior: smooth;
  }

  .title_wrapper {
    display: none;
  }

  .viewport_wrapper {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    z-index: -1;
    overflow: hidden;
  }

  .mask_phone {
    width: 100%;
    height: 100%;
    display: flex;
    background: none;
  }

  .main_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    bottom: 0;
    left: 0;
  }
  .analysis_chat {
    position: absolute;
    background: rgb(193, 208, 219);
    width: 0;
    height: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s ease-in-out;
  }

  .opened {
    width: 100%;
    transition: 0.3s ease-in-out;
  }

  .chat_header {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .chat_header_name {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .chat_my_msg {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .chat_meta {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 25px;
    font-size: 8px;
  }

  .meta_pad {
    width: 100%;
  }
  .pad_14 {
    height: 14px;
  }

  .pad_16 {
    height: 16px;
  }

  .pad_31 {
    height: 31px;
  }

  .pad_39 {
    height: 39px;
  }

  .timestamp {
    font-size: 10px;
    color: #898989;
  }

  .read_number {
    text-align: end;
    color: #fbe44c;
    font-weight: bold;
    font-size: 10px;
    margin-bottom: -2px;
    margin-right: 5px;
  }

  .chat_my_msg_bubble {
    background: #fbe44c;
    max-width: 70%;
    padding: 8px;
    border-radius: 10px;
    position: relative;
    margin-right: 15px;
    font-size: 12px;
    margin-top: 10px;
  }
  .my_msg_first:after {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #fbe44c;
    border-right: 0;
    border-top: 0;
    margin-right: -5px;
  }

  .chat_cat_msg {
    width: 100%;
    display: flex;
    padding-left: 10px;
    margin-top: 10px;
  }

  .chat_cat_meta {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 25px;
    font-size: 8px;
    margin-left: 5px;
  }

  .chat_cat_name {
    position: absolute;
    top: -20px;
    left: 0;
    color: #898989;
    font-size: 12px;
  }

  .chat_cat_avatar {
    height: 30px;
    width: 30px;
    border-radius: 12px;
    background: url("assets/cat.jpeg");
    background-size: cover;
  }

  .chat_cat_msg_bubble {
    background: white;
    max-width: 70%;
    padding: 8px;
    border-radius: 10px;
    position: relative;
    margin-left: 45px;
    font-size: 12px;
    margin-top: -5px;
  }

  .cat_msg_first {
    margin-top: 20px;
    margin-left: 15px;
  }

  .cat_msg_first:after {
    content: "";
    position: absolute;
    left: 0;
    top: 10%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: white;
    border-left: 0;
    border-top: 0;
    margin-left: -5px;
  }

  .chat_footer {
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    font-size: 14px;
    color: #898989;
  }

  .chat_footer_toolbar {
    width: 100%;
    padding: 5px;
    display: flex;
    background: #f9f9f9;
    border: 1px solid #d9d9d9;
    border-bottom: 0;
  }

  .chat_footer_input {
    width: 100%;
    height: 80px;
    display: flex;
    border: 1px solid #d9d9d9;
    border-collapse: collapse;
  }

  .chat_footer_text {
    height: 80px;
    flex: 1;
    display: flex;
    padding: 10px;
    padding-top: 0px;
  }

  .chat_footer_action {
    width: 90px;
    height: 100%;
    display: flex;
    padding: 10px;
  }

  .chat_footer_button {
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    background: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a9a9a9;
  }

  .button_activated {
    border: 1px solid #fbe44c;
    background: #fbe44c;
    color: black;
    cursor: pointer;
  }
}
</style>
