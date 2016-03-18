import styles from './issue-list.styles';
import ColorField from '../../components/color-field/color-field';
import {next} from '../../components/icon/icon';
import React, {View, Text, TouchableHighlight, Image} from 'react-native';

class IssueRow extends React.Component {
  static _getSubText(issue) {

    let forText = () => {
      if (issue.Assignee) {
        return `for ${issue.Assignee[0].fullName}`;
      }
      return '    Unassigned'
    };

    return `${issue.project.shortName}-${issue.numberInProject} by ${issue.reporter.name || issue.reporter.login} ${forText()}`
  }

  getSummaryStyle(issue) {
    if (issue.resolved) {
      return {
        color: '#888'
      };
    }
  }

  render() {
    let issue = this.props.issue;

    return (
      <TouchableHighlight underlayColor='#FFF' onPress={() => this.props.onClick(issue)}>
        <View style={styles.row}>
          <View>
            {issue.priority ? <ColorField field={issue.priority}></ColorField> : <View/>}
          </View>
          <View style={styles.rowText}>
            <View style={styles.rowTopLine}>
              <Text style={[styles.summary, this.getSummaryStyle(issue)]}>
                {issue.summary}
              </Text>
              <Image style={styles.arrowImage} source={next}></Image>
            </View>
            <Text style={styles.subtext}>{IssueRow._getSubText(issue)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = IssueRow;
