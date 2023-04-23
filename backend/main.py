from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import datetime
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



cred = credentials.Certificate("fbtoken.json")
fb_app = firebase_admin.initialize_app(cred)
db = firestore.client()

db.collection(u"qsl").add({
    u"a": "mark",
    u"b": "alan",
    u"at": datetime.datetime.now().isoformat()
})

db.collection(u"qsl").add({
    u"a": "jenny",
    u"b": "alan",
    u"at": datetime.datetime.now().isoformat()
})

db.collection(u"qsl").add({
    u"a": "david",
    u"b": "alan",
    u"at": datetime.datetime.now().isoformat()
})

db.collection(u"users").add({
    u"uid": "jenny",
    u"name": "Jenny",
    u"hometown": "San Diego, CA",
    u"remarks": "lorem ipsum dolor est"
})

db.collection(u"users").add({
    u"uid": "alan",
    u"name": "Alan",
    u"hometown": "Los Angeles, CA",
    u"remarks": "lorem ipsum dolor est"
})

db.collection(u"users").add({
    u"uid": "david",
    u"name": "David",
    u"hometown": "Mars",
    u"remarks": "lorem ipsum dolor est"
})

db.collection(u"users").add({
    u"uid": "mark",
    u"name": "Mark",
    u"hometown": "Trinidad, CA",
    u"remarks": "???"
})

partial_timeout = datetime.timedelta(seconds = 30)

def is_qsl(a_uid, b_uid):
    users_ref = db.collection(u"qsl")
    qsl = users_ref.stream()

    for q in qsl:
        q = q.to_dict()
        a = q["a"]
        b = q["b"]
        if (a, b) == (a_uid, b_uid) or (b, a) == (a_uid, b_uid):
            return True
    return False

def clean_expired_partials():
    for i in range(len(partial_qsl)):
        d = partial_exp[i]
        if partial_timeout <= datetime.datetime.now():
            pass # TODO


partial_qsl = [] # list of tuples
partial_exp = [] # list of datetimes

# Should redirect to /login if not logged in,
# and to /stats if logged in
@app.route("/")
@cross_origin()
def api_index():
    return "index"


@app.route("/get_partial_timeout/<other_uid>")
@cross_origin()
def api_partial_timeout(other_uid):
    self_uid = "knuth" if other_uid == "mark" else "mark"
    # request.headers.get('your-header-name')

    if self_uid == other_uid:
        return { "status": "error" }
    elif is_qsl(self_uid, other_uid):
        return { "status": "error" }

    # First element of tuple is contact initiator.
    if (other_uid, self_uid) in partial_qsl or (self_uid, other_uid) in partial_qsl:
        if (self_uid, other_uid) in partial_qsl:
             i = partial_qsl.index( (self_uid, other_uid) )
        else:
            i = partial_qsl.index( (other_uid, self_uid) )
        e = partial_exp[i]

        if e <= datetime.datetime.now():
            return {
                "status": "expired",
                "ttl":  0
            }

        return {
            "status": "ok",
            "ttl":  (e - datetime.datetime.now()).seconds
        }

    return { "status": "error" }


@app.route("/scan/<other_uid>")
@cross_origin()
def api_scan(other_uid):

    self_uid = "knuth" if other_uid == "mark" else "mark"
    # request.headers.get('your-header-name')

    if self_uid == other_uid:
        return {
            "status": "self",
        }

    elif is_qsl(self_uid, other_uid):
        return {
            "status": "already done",
        }

    # First element of tuple is contact initiator.
    if (other_uid, self_uid) in partial_qsl:
        i = partial_qsl.index( (other_uid, self_uid) )
        partial_qsl.pop(i)
        e = partial_exp.pop(i)

        if e <= datetime.datetime.now():
            print("reset")
            partial_qsl.append( (self_uid, other_uid) )
            partial_exp.append( datetime.datetime.now() + partial_timeout)
            return {
                "status": "partial",
                "ttl":  partial_timeout.seconds
            }

        doc_ref = db.collection(u"qsl").add({
            u"a": other_uid,
            u"b": self_uid,
            u"at": datetime.datetime.now().isoformat()
        })

        return {
            "status": "success",
        }

    elif (self_uid, other_uid) in partial_qsl:
        i = partial_qsl.index( (self_uid, other_uid) )
        partial_exp[i] = datetime.datetime.now() + partial_timeout
        return {
            "status": "partial",
            "ttl": partial_timeout.seconds
        }

    else:
        partial_qsl.append( (self_uid, other_uid) )
        partial_exp.append( datetime.datetime.now() + partial_timeout )
        return {
            "status": "partial",
            "ttl":  partial_timeout.seconds
        }

@app.route("/data/<uid>")
@cross_origin()
def api_data(uid):
    qsl_ref = db.collection(u'qsl')
    a = qsl_ref.where(u'a', u'==', uid).stream()
    b = qsl_ref.where(u'b', u'==', uid).stream()
    l = list(a) + list(b)

    qsl_ref = db.collection(u'users')
    a = qsl_ref.where(u'uid', u'==', uid).stream()

    d = next(a).to_dict()
    d["qsl"] = [x.to_dict() for x in l]

    return d