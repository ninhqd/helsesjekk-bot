import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import { Metadata } from 'next'

import { Question, getTeamByAdGroup, QuestionType } from '../../../db'
import { userHasAdGroup } from '../../../auth/authentication'
import { questionTypeToText } from '../../../utils/asked'
import { questionsFromJsonb } from '../../../questions/jsonb-utils'
import BackLink from '../../../components/core/BackLink'
import EditableTeamName from '../../../components/edit/EditableTeamName'
import EditableTime from '../../../components/edit/EditableTime'

export const metadata: Metadata = {
    title: 'Helsesjekk | Team',
    description: 'Detaljer for ditt team i helsesjekk bot',
}

type Props = {
    params: {
        groupId: string
    }
}

async function Page({ params }: Props): Promise<ReactElement> {
    if (!userHasAdGroup(params.groupId)) {
        return (
            <div>
                <BackLink href="/" />
                <TeamNotAccesible />
            </div>
        )
    }

    const team = await getTeamByAdGroup(params.groupId)
    if (!team) {
        return (
            <div>
                <BackLink href="/" />
                <TeamNotFound />
            </div>
        )
    }

    return (
        <div className="max-w-prose">
            <BackLink href="/" />
            <Heading size="large">Ditt team</Heading>
            <EditableTeamName teamId={team.id} name={team.name} />
            <EditableTime teamId={team.id} hour={team.postHour} day={team.postDay} type="ask" />
            <EditableTime teamId={team.id} hour={team.revealHour} day={team.revealDay} type="reveal" />
            <Questions questions={questionsFromJsonb(team.questions)} />
        </div>
    )
}

function QuestionListItem({ text, emoji }: { text: string; emoji: string }): ReactElement {
    return (
        <li className="flex items-center">
            <span className="pr-2">{emoji}</span>
            <span className="mb-0.5">{text}</span>
        </li>
    )
}

function Questions({ questions }: { questions: Question[] }): ReactElement {
    const groups = R.groupBy.strict(questions, R.prop('type'))

    return (
        <div>
            <Heading size="medium" level="2" spacing>
                Spørsmål
            </Heading>
            <div className="flex flex-col gap-4">
                {R.toPairs.strict(groups).map(([type, questions]) => (
                    <div key={type}>
                        <Heading size="small" level="3" spacing>
                            {questionTypeToText(type as QuestionType)}
                        </Heading>
                        <ul className="flex flex-col gap-3">
                            {questions.map((question) => (
                                <li key={question.questionId} className="bg-bg-subtle p-3 pt-2 rounded">
                                    <Heading size="small" level="4" spacing className="mt-0">
                                        {question.question}
                                    </Heading>
                                    <ul className="flex flex-col gap-3">
                                        <QuestionListItem emoji="🟢" text={question.answers.HIGH} />
                                        <QuestionListItem emoji="🟡" text={question.answers.MID} />
                                        <QuestionListItem emoji="🔴" text={question.answers.LOW} />
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TeamNotAccesible(): ReactElement {
    return (
        <div>
            <Heading size="large" spacing>
                Du har ikke tilgang til dette teamet
            </Heading>
            <BodyShort spacing>Teamet kan også ikke finnes.</BodyShort>
            <BodyLong>
                Du kan koble teamet ditt sin kanal til et team ved å bruke{' '}
                <code className="bg-gray-100 p-1">/helsesjekk assign gruppe-id</code> i kanalen hvor botten er aktivert.
            </BodyLong>
        </div>
    )
}

function TeamNotFound(): ReactElement {
    return (
        <div>
            <Heading size="large" spacing>
                Teamet finnes ikke
            </Heading>
            <BodyShort spacing>Teamet kan også ikke finnes.</BodyShort>
            <BodyLong spacing>
                Du kan koble teamet ditt sin kanal til et team ved å bruke{' '}
                <code className="bg-gray-100 p-1">/helsesjekk assign gruppe-id</code> i kanalen hvor botten er aktivert.
            </BodyLong>
            <BodyLong>Dersom du har koblet til et team, så kan det være at du har brukt feil gruppe-id.</BodyLong>
        </div>
    )
}

export default Page