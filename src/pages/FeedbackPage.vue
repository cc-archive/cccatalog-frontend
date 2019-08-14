<template>
  <div class="feedback page">
    <header-section showNavSearch="true"></header-section>

    <div class="content">
      <Container>
        <h1 id="feedback">{{ $t('feedback') }}</h1>
        <p>
          Thank you for using CC Search! We welcome your ideas for improving the tool below.
          To provide regular user feedback, join the
          <a href="https://creativecommons.slack.com/messages/CCS9CF2JE/details/">#cc-usability</a> channel on
          <a href="https://wiki.creativecommons.org/wiki/Slack#How_to_join_Slack">CC Slack</a>.
        </p>
        <p>
          To report a bug, <a href="#report">click here</a>.
        </p>

        <div class="form-wrapper">
          <iframe class="form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfb_6yq2Md0v6S-XzsyT7p1QVhqr7MWHqInKdyYh4ReaWn4FQ/viewform?embedded=true"
                  width="640"
                  height="1024">
            Loading...
          </iframe>
        </div>

        <div>
          <h2>{{ $t('report') }}<a id="report">&nbsp;</a></h2>
          <p>
            If you would like to report a bug you are encountering when using the tool,
            please do one of the following:
          </p>
          <ul>
            <li>
              <a href="mailto:support-search@creativecommons.org">
                <em>&nbsp;Email:</em> support-search@creativecommons.org
              </a>
            </li>
            <li>
              <a href="https://github.com/creativecommons/cccatalog-frontend/issues">
                <em>GitHub:</em> open new issue
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>

    <footer-section></footer-section>
  </div>
</template>

<script>
import {
  Container,
} from '@creativecommons/vocabulary';

import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

const FeedbackPage = {
  name: 'feedback-page',
  components: {
    Container,

    HeaderSection,
    FooterSection,
  },
  computed: {
    isReportingBug() {
      return this.$store.state.isReportingBug;
    },
    bugReported() {
      return this.$store.state.bugReported;
    },
    bugReportFailed() {
      return this.$store.state.bugReportFailed;
    },
  },
};

export default FeedbackPage;
</script>

<style lang="scss" scoped>
  @import '../styles/text-only-page.scss';

  .feedback.page {
    .form-wrapper {
      width: 40em;

      margin: auto;

      .form {
        border: none;

        margin: 0;
      }
    }
  }
</style>

<i18n src="../locales/pages/FeedbackPage.json">
</i18n>
