<template>
  <div class="grid-container full">
    <header-section showNavSearch="true"></header-section>
    <div class="feedback-page">
      <h1 id="feedback">Feedback</h1>
      <p>
        Thank you for using CC Search! We welcome your ideas for improving the tool below.
        To provide regular user feedback, join the
        <a href="https://creativecommons.slack.com/messages/CCS9CF2JE/details/">#cc-usability</a> channel on
        <a href="https://wiki.creativecommons.org/wiki/Slack#How_to_join_Slack">CC Slack</a>.
      </p>
      <p>
        To report a bug, <a href="#report">click here</a>.
      </p>

      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfb_6yq2Md0v6S-XzsyT7p1QVhqr7MWHqInKdyYh4ReaWn4FQ/viewform?embedded=true"
              width="100%"
              height="998"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="feedback form">
              Loading...
      </iframe>
        <h2><a id="report"></a>Report a bug</h2>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeSN1AIG8LrdgIdKpBj4IlPDhu6T5ndZ7z_QcISBu-ITCU0Yw/viewform?embedded=true"
              width="100%"
              height="998"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="feedback form">
              Loading...
      </iframe>
    </div>
    <footer-section></footer-section>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

export default {
  name: 'feedback-page',
  components: {
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
</script>

<style lang="scss" scoped>
  h1, h2 {
    margin-bottom: .44117647em;
    font-size: 2.125em;
    font-weight: normal;
    letter-spacing: initial;
    line-height: 1.25;
    text-transform: initial;
  }

  .feedback-page {
    margin: 45px !important;
  }
</style>
